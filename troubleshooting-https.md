# Troubleshooting HTTPS for GitHub Pages

## Error: "Your domain is not properly configured to support HTTPS"

This error occurs when GitHub cannot issue an SSL certificate for your custom domain. Follow these steps to resolve it:

## 1. Verify DNS Configuration

Ensure your DNS records are correctly configured:

- **A Records** for apex domain (klosh.co.uk) pointing to GitHub's IP addresses:
  ```
  185.199.108.153
  185.199.109.153
  185.199.110.153
  185.199.111.153
  ```

- **CNAME Record** for www subdomain pointing to `yourusername.github.io.`

## 2. Check for DNS Propagation

DNS changes can take time to propagate globally (up to 48 hours). You can check if your DNS settings have propagated using these commands:

```bash
dig klosh.co.uk +noall +answer
dig www.klosh.co.uk +noall +answer
```

Or use online tools like [dnschecker.org](https://dnschecker.org/) or [whatsmydns.net](https://www.whatsmydns.net/).

## 3. Check for CAA Records

Certificate Authority Authorization (CAA) records can prevent GitHub from issuing certificates. Make sure there are no CAA records blocking GitHub's certificate authority, or add a CAA record allowing GitHub:

```
CAA 0 issue "letsencrypt.org"
CAA 0 issue "pki.goog"
CAA 0 issue "digicert.com"
CAA 0 issue "amazon.com"
```

## 4. Remove and Re-add Custom Domain

Sometimes, removing and re-adding your custom domain in GitHub Pages settings can help:

1. Go to your repository settings
2. Navigate to Pages
3. Remove the custom domain
4. Save changes
5. Add the custom domain again
6. Save changes

## 5. Wait for Certificate Provisioning

After confirming your DNS settings are correct, GitHub needs time to provision an SSL certificate. This typically takes a few hours but can take up to 24 hours.

## 6. Contact GitHub Support

If you've followed all these steps and still have issues after 24 hours, consider contacting GitHub Support.
