import React from "react"
import { Link } from "gatsby"
import { OutboundLink } from "gatsby-plugin-google-analytics"

export default ({ label, desc, url }) => {
  if (url.includes("http")) {
    return (
      <div className="grow">
        <OutboundLink
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="link margin-15-b"
          id="path"
        >
          <h1 className="margin-3-b margin-0-t">{label}</h1>
        </OutboundLink>
      </div>
    )
  } else {
    return (
      <Link to={url} className="link margin-15-b" id="path">
        <div className="grow">
          <h1 className="margin-3-b margin-0-t">{label}</h1>
        </div>
      </Link>
    )
  }
}