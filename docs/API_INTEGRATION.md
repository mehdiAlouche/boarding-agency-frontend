# API Integration Guide

## Base URL

- `NEXT_PUBLIC_API_BASE_URL`

## Auth

- `POST /auth/login`
- `POST /auth/register`
- `POST /auth/refresh`

## Profile

- `GET /profile`
- `PUT /profile`
- `POST /profile/cv`
- `GET /profile/score`

## Matching

- `GET /matching`
- `GET /matching/:id`
- `GET /matching/:id/explanation`

## Journey

- `GET /journey/status`

## Appointments

- `GET /appointments`
- `GET /appointments/slots`
- `POST /appointments/book`
- `DELETE /appointments/:id`

## Messaging

- `GET /messaging/conversations`
- `GET /messaging/conversations/:conversationId/messages`
- `POST /messaging/messages`

## Resources

- `GET /resources/housing`
- `GET /resources/integration`
- `GET /resources/community`

## Error Handling

- Axios response interceptor maps backend errors to user-friendly messages.
- 401 responses trigger token refresh flow.
- Refresh failure clears local auth tokens and redirects to login.

## Notes

- The frontend displays backend-calculated values (scores, ranks, journey states) as-is.
- No business logic or AI computation is implemented on client side.
