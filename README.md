# EPG

![auto-update](https://github.com/iptv-org/epg/actions/workflows/auto-update.yml/badge.svg)

EPG (Electronic Program Guide) for thousands of TV channels collected from different sources.

## Usage

To load a program guide, all you need to do is copy the link to one or more of the guides from the list below and paste it into your favorite player.

<!-- prettier-ignore -->
<table>
  <thead>
    <tr><th align="left">Country</th><th align="left">Channels</th><th align="left">EPG</th></tr>
  </thead>
  <tbody>
    <tr><td align="left" valign="top" nowrap>🇸🇹 São Tomé & Príncipe</td><td align="right">1</td><td align="left" nowrap><code>https://iptv-org.github.io/epg/guides/st/dstv.com.epg.xml</code></td></tr>
  </tbody>
</table>

### US States

<!-- prettier-ignore -->
<table>
  <thead>
    <tr><th align="left">State</th><th align="left">Channels</th><th align="left">EPG</th></tr>
  </thead>
  <tbody>
    <tr><td align="left" valign="top" nowrap>New Jersey</td><td align="right">1</td><td align="left" nowrap><code>https://iptv-org.github.io/epg/guides/us-nj/tvtv.us.epg.xml</code></td></tr>
  </tbody>
</table>

### Provinces of Canada

<!-- prettier-ignore -->
<table>
  <thead>
    <tr><th align="left">Province</th><th align="left">Channels</th><th align="left">EPG</th></tr>
  </thead>
  <tbody>
  </tbody>
</table>

## List of supported channels

https://iptv-org.github.io/epg/index.html

## For Developers

You can also get a list of all available channels and their codes in JSON format by sending a GET request to:

```
https://iptv-org.github.io/epg/api/channels.json
```

If successful, you should get the following response:

<details>
<summary>Expand</summary>
<br>

```
[
  ...
  {
    "id": "CNNUSA.us",
    "name": [
      "CNN USA"
    ],
    "logo": "https://cdn.tvpassport.com/image/station/100x100/cnn.png",
    "country": "US",
    "guides": [
      "https://iptv-org.github.io/epg/guides/tvtv.us.guide.xml",
      ...
    ]
  },
  ...
]
```

</details>

## Contribution

If you find a bug or want to contribute to the code or documentation, you can help by submitting an [issue](https://github.com/iptv-org/epg/issues) or a [pull request](https://github.com/iptv-org/epg/pulls).
