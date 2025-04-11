# DNS Configuration for GitHub Pages

## A Records for Apex Domain (klosh.co.uk)
Add these A records in your domain registrar's DNS settings:

```
Type    Host    Value
A       @       185.199.108.153
A       @       185.199.109.153
A       @       185.199.110.153
A       @       185.199.111.153
```

## CNAME Record for WWW Subdomain (www.klosh.co.uk)
Add this CNAME record:

```
Type    Host    Value
CNAME   www     yourusername.github.io.
```

Replace 'yourusername' with your actual GitHub username.

## Important Notes:
1. The '@' symbol represents the apex domain (klosh.co.uk)
2. Make sure to include the trailing dot in the CNAME value
3. DNS changes can take up to 48 hours to propagate globally
4. After DNS propagation, GitHub will automatically provision an SSL certificate
