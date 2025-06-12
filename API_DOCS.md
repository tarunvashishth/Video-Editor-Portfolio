# Video Editor Portfolio API Documentation

This document outlines the API endpoints required by the frontend for portfolio onboarding and editing. Please ensure the backend implements these endpoints as described for seamless integration.

---

## 1. Submit Portfolio URL

- **Endpoint:** `/api/portfolio`
- **Method:** `POST`
- **Description:** Accepts a portfolio URL, extracts structured data, and returns a generated username and portfolio data.

**Request Body:**

```json
{
  "portfolioUrl": "https://sonuchoudhary.my.canva.site/portfolio"
}
```

**Response Body (Success):**

```json
{
  "portfolio": {
    "id": "1",
    "username": "sonuchoudhary",
    "firstName": "Sonu",
    "lastName": "Choudhary",
    "summary": "Professional video editor...",
    "employers": [
      {
        "id": "1",
        "name": "Freelance Video Editor",
        "jobTitle": "Video Editor",
        "duration": "2020 - Present",
        "type": "contract",
        "contribution": "Creating high-quality video content...",
        "videos": [
          {
            "id": "1",
            "url": "https://youtube.com/watch?v=techstart",
            "title": "TechStart Brand Video",
            "thumbnail": "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&auto=format&fit=crop&q=60"
          }
        ]
      }
    ]
  },
  "username": "sonuchoudhary"
}
```

**Response Body (Error):**

```json
{
  "error": "Portfolio URL is required"
}
```

---

## 2. Save Portfolio (Edit Profile)

- **Endpoint:** `/api/savePortfolio`
- **Method:** `POST`
- **Description:** Saves the edited portfolio data for the user. Returns a success status.

**Request Body:**

```json
{
  "id": "1",
  "username": "sonuchoudhary",
  "firstName": "Sonu",
  "lastName": "Choudhary",
  "summary": "Professional video editor...",
  "employers": [
    {
      "id": "1",
      "name": "Freelance Video Editor",
      "jobTitle": "Video Editor",
      "duration": "2020 - Present",
      "type": "contract",
      "contribution": "Creating high-quality video content...",
      "videos": [
        {
          "id": "1",
          "url": "https://youtube.com/watch?v=techstart",
          "title": "TechStart Brand Video",
          "thumbnail": "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&auto=format&fit=crop&q=60"
        }
      ]
    }
  ]
}
```

**Response Body (Success):**

```json
{
  "success": true,
  "message": "Portfolio saved (mock)"
}
```

**Response Body (Error):**

```json
{
  "success": false,
  "message": "Failed to save portfolio. Please try again."
}
```

---

**Notes:**

- All endpoints are currently mocked and do not persist data.
- The frontend expects the above formats for smooth integration.
- For real implementation, authentication and validation should be added.
