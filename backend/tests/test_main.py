"""Functional tests for the Profile API (FastAPI).

Covers the full HTTP contract consumed by the React frontend in dev
(via Vite proxy `/api/*` -> port 8000) plus unit-level checks on
`load_profile()`.

Run with:  `pytest backend/tests -v`  (from repo root)
"""

import json
from pathlib import Path

import pytest
from fastapi.testclient import TestClient

from main import PROFILE_PATH, app, load_profile

client = TestClient(app)

EXPECTED_ORIGINS = {"http://localhost:5173", "http://127.0.0.1:5173"}


# ---------------------------------------------------------------------------
# /api/health — functional
# ---------------------------------------------------------------------------
class TestHealth:
    def test_health_returns_200_and_ok_status(self):
        res = client.get("/api/health")
        assert res.status_code == 200
        assert res.json() == {"status": "ok"}

    def test_health_returns_json_content_type(self):
        res = client.get("/api/health")
        assert "application/json" in res.headers["content-type"]

    def test_health_does_not_accept_post(self):
        res = client.post("/api/health")
        assert res.status_code == 405


# ---------------------------------------------------------------------------
# /api/profile — functional (core contract with the frontend)
# ---------------------------------------------------------------------------
class TestProfileEndpoint:
    def test_profile_returns_200(self):
        res = client.get("/api/profile")
        assert res.status_code == 200

    def test_profile_returns_json_content_type(self):
        res = client.get("/api/profile")
        assert "application/json" in res.headers["content-type"]

    def test_profile_matches_shared_json_file(self):
        """The API must serve exactly what is in shared/profile.json."""
        res = client.get("/api/profile")
        on_disk = json.loads(PROFILE_PATH.read_text(encoding="utf-8"))
        assert res.json() == on_disk

    def test_profile_contains_required_top_level_keys(self):
        data = client.get("/api/profile").json()
        for key in (
            "name",
            "role",
            "bio",
            "contact",
            "languages",
            "experience",
            "certifications",
        ):
            assert key in data, f"missing top-level key: {key}"

    def test_profile_contact_has_valid_links(self):
        contact = client.get("/api/profile").json()["contact"]
        assert "@" in contact["email"]
        assert contact["github"].startswith("https://")
        assert contact["linkedin"].startswith("https://")

    def test_profile_languages_have_unique_ids(self):
        languages = client.get("/api/profile").json()["languages"]
        ids = [lang["id"] for lang in languages]
        assert len(ids) == len(set(ids))
        assert all(ids)

    def test_profile_experience_have_unique_ids_and_types(self):
        experience = client.get("/api/profile").json()["experience"]
        ids = [item["id"] for item in experience]
        assert len(ids) == len(set(ids))
        valid_types = {"work", "education"}
        for item in experience:
            assert item["type"] in valid_types
            assert item["title"]
            assert item["org"]
            assert item["period"]

    def test_profile_certifications_have_https_urls(self):
        certifications = client.get("/api/profile").json()["certifications"]
        assert len(certifications) > 0
        ids = [c["id"] for c in certifications]
        assert len(ids) == len(set(ids))
        for cert in certifications:
            assert cert["title"]
            assert cert["org"]
            assert cert["url"].startswith("https://")

    def test_profile_does_not_accept_post(self):
        res = client.post("/api/profile")
        assert res.status_code == 405

    def test_unknown_api_route_returns_404(self):
        res = client.get("/api/does-not-exist")
        assert res.status_code == 404

    def test_profile_response_is_deterministic(self):
        """Two consecutive calls must return identical payloads."""
        first = client.get("/api/profile").json()
        second = client.get("/api/profile").json()
        assert first == second


# ---------------------------------------------------------------------------
# CORS — functional (frontend runs on :5173, API on :8000)
# ---------------------------------------------------------------------------
class TestCors:
    @pytest.mark.parametrize("origin", sorted(EXPECTED_ORIGINS))
    def test_allowed_origins_get_cors_headers(self, origin):
        res = client.get("/api/profile", headers={"Origin": origin})
        assert res.status_code == 200
        assert res.headers.get("access-control-allow-origin") == origin

    def test_preflight_options_returns_cors_headers(self):
        res = client.options(
            "/api/profile",
            headers={
                "Origin": "http://localhost:5173",
                "Access-Control-Request-Method": "GET",
            },
        )
        assert res.status_code == 200
        assert (
            res.headers.get("access-control-allow-origin")
            == "http://localhost:5173"
        )

    def test_disallowed_origin_gets_no_cors_header(self):
        res = client.get("/api/profile", headers={"Origin": "https://evil.example"})
        assert "access-control-allow-origin" not in res.headers


# ---------------------------------------------------------------------------
# load_profile() — unit
# ---------------------------------------------------------------------------
class TestLoadProfile:
    def test_load_profile_reads_shared_file(self):
        data = load_profile()
        on_disk = json.loads(PROFILE_PATH.read_text(encoding="utf-8"))
        assert data == on_disk

    def test_profile_path_points_to_shared_dir(self):
        assert PROFILE_PATH.name == "profile.json"
        assert PROFILE_PATH.parent.name == "shared"
        assert PROFILE_PATH.exists()

    def test_shared_profile_json_is_valid_utf8(self):
        raw = PROFILE_PATH.read_bytes()
        text = raw.decode("utf-8")
        assert json.loads(text)["name"]


# ---------------------------------------------------------------------------
# OpenAPI schema — functional (docs served for devs)
# ---------------------------------------------------------------------------
class TestOpenApi:
    def test_openapi_schema_exposes_both_routes(self):
        res = client.get("/openapi.json")
        assert res.status_code == 200
        paths = res.json()["paths"]
        assert "/api/health" in paths
        assert "/api/profile" in paths
