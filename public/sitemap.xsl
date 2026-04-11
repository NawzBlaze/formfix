<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="2.0" 
                xmlns:html="http://www.w3.org/TR/REC-html40"
                xmlns:sitemap="http://www.sitemaps.org/schemas/sitemap/0.9"
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
	<xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>
	<xsl:template match="/">
		<html xmlns="http://www.w3.org/1999/xhtml">
			<head>
				<title>XML Sitemap Index - FormFix</title>
				<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
				<style type="text/css">
					body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif; color: #334155; max-width: 800px; margin: 40px auto; padding: 0 20px; line-height: 1.5; background: #f8fafc; }
					h1 { color: #1e1b4b; font-weight: 800; font-size: 24px; margin-bottom: 20px; border-bottom: 2px solid #e2e8f0; padding-bottom: 15px; }
					p { font-size: 14px; color: #64748b; margin-bottom: 30px; }
					table { width: 100%; border-collapse: collapse; background: #fff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1); }
					th { background: #f1f5f9; text-align: left; padding: 15px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; border-bottom: 1px solid #e2e8f0; }
					td { padding: 15px; border-bottom: 1px solid #f1f5f9; font-size: 14px; }
					tr:last-child td { border-bottom: none; }
					a { color: #4f46e5; text-decoration: none; font-weight: 600; }
					a:hover { text-decoration: underline; }
					.count { font-weight: bold; color: #4f46e5; }
				</style>
			</head>
			<body>
				<h1>FormFix Master Sitemap Index</h1>
				<p>This is an XML Sitemap, meant for consumption by search engines like Google. For more information, visit <a href="https://sitemaps.org">sitemaps.org</a>.</p>
				<table>
					<thead>
						<tr>
							<th>Sitemap URL</th>
							<th>Last Modified</th>
						</tr>
					</thead>
					<tbody>
						<xsl:for-each select="sitemap:sitemapindex/sitemap:sitemap">
							<tr>
								<td>
									<a href="{sitemap:loc}"><xsl:value-of select="sitemap:loc"/></a>
								</td>
								<td>
									<xsl:value-of select="sitemap:lastmod"/>
								</td>
							</tr>
						</xsl:for-each>
					</tbody>
				</table>
			</body>
		</html>
	</xsl:template>
</xsl:stylesheet>
