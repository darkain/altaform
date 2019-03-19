<?xml version="1.0" encoding="utf-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
	<channel>
		<title>[og.title]</title>
		<link>[afurl.host][afurl.base]</link>
		<description>[og.description;safe=nobr]</description>
		<language>[channel.language;ifempty='en-us']</language>
		<docs>https://validator.w3.org/feed/docs/rss2.html</docs>
		<generator>[af.version]</generator>
		<copyright>[onshow..now;date=Y] [og.title]</copyright>
		<lastBuildDate>[channel.timestamp;date=r]</lastBuildDate>
		<category>[channel.category;magnet=category]</category>
		<managingEditor>[channel.editor;magnet=managingEditor]</managingEditor>
		<webMaster>[channel.webmaster;magnet=webMaster]</webMaster>
		<ttl>[channel.ttl;ifempty=60]</ttl>
		<atom:link href="[afurl.all]" rel="self" type="application/rss+xml" />

		<item>
			<title>[rss.title;block=item]</title>
			<link>[afurl.host][afurl.base]/[rss.title;f=urlname]</link>
			<description>[rss.description;safe=nobr]</description>
			<author>[rss.author;magnet=author]</author>
			<category>[rss.category;magnet=category]</category>
			<comments>[rss.comments;magnet=comments]</comments>
			<guid isPermaLink="true">[afurl.host][afurl.base]/[rss.title;f=urlname]</guid>
			<pubDate>[rss.timestamp;date=r]</pubDate>
		</item>
	</channel>
</rss>
