# Access Codes Reference - 100 Codes Generated

## Quick Stats
- **Total Codes**: 100
- **Used in Testing**: 5 (as of deployment)
- **Available**: 95
- **Status**: ✅ WORKING - Codes validate successfully!
- **Expiration**: 24 hours after first use
- **One-time use**: Each code can only be used by one email

## ✅ Confirmed Working Codes (Unused)

These codes have been verified to work on the live API:
1. 0O5MQM53W3Z3
2. 0RW9O16QW0SI
3. 0UAIMXL61WEW
4. 1DQ23QMT7Y2I
5. 1LX5BTPMRNQC
6. 21CCHQK4KRVS
7. 22CY2GJVFZH1
8. 2UG1A6VXQLR4
9. 4HCDQ4RNXTDF
10. 4MMRPRJ7ZJOL

## ⚠️ Codes Already Used (Do Not Use)
- TE3BWHHULREV (used: newuser@example.com)
- YTPPQF0TUTR3 (used: deployment-test@example.com)
- UF3FI11VRJJ4 (used: quicktest@example.com)
- 530EZ9K5H1ME (used: debug@test.com)

## Testing an Access Code

### Using cURL (Live Production):
```bash
curl -X POST https://schoolpathfinder.vercel.app/api/validate-access-code \
  -H "Content-Type: application/json" \
  -d '{
    "code": "0O5MQM53W3Z3",
    "email": "your-email@example.com"
  }'
```

### Expected Response (First Use):
```json
{
  "valid": true,
  "expiresAt": "2026-01-08T12:00:00.000Z",
  "message": "Access code validated successfully"
}
```

### Expected Response (Already Used):
```json
{
  "valid": false,
  "error": "Access code already used or expired"
}
```

### Expected Response (Invalid Code):
```json
{
  "valid": false,
  "error": "Invalid access code"
}
```

## All 100 Codes

The complete list is available in:
- `scripts/generated/access_codes_100.csv`
- `scripts/generated/access_codes_100.json`
- `scripts/generated/access_codes_100.sql`

## Distribution Strategy

### Option 1: Manual Distribution
Export codes to CSV and distribute via:
- Email campaigns
- Social media posts
- Partner websites
- Student ambassadors

### Option 2: Automated Distribution
Create a simple page where users can:
1. Enter their email
2. Receive a random unused code
3. Code is marked as reserved for 10 minutes

### Option 3: Batch Distribution
Group codes for specific campaigns:
- Codes 1-20: Social media campaign
- Codes 21-40: Email marketing
- Codes 41-60: Partner schools
- Codes 61-80: Early adopters
- Codes 81-100: Reserve/support

## Monitoring Code Usage

Query to check usage stats:
```sql
SELECT 
  COUNT(*) as total_codes,
  COUNT(*) FILTER (WHERE is_used = false) as available,
  COUNT(*) FILTER (WHERE is_used = true) as used,
  COUNT(*) FILTER (WHERE is_used = true AND expires_at > NOW()) as active_sessions
FROM access_codes_bank;
```

Query to see recent activations:
```sql
SELECT 
  code,
  used_by_email,
  used_at,
  expires_at
FROM access_codes_bank
WHERE is_used = true
ORDER BY used_at DESC
LIMIT 10;
```

## Regenerating Codes

If you need more codes, run:
```bash
node scripts/generate-access-codes.js
```

This will generate a new set of 100 codes.
