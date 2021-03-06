import React from "react"
import { graphql } from "gatsby"
import { OutboundLink } from "gatsby-plugin-google-analytics"
import Layout from "../components/layout"
import SEO from "../components/seo"

const BoilerPlate = ({ title, desc, flag, repo, demo }) => (
  <div className="col-xs-12 col-md-6 pad-3">
    <div
      className="pad-2 pad-3-lr is-white-bg border-radius "
      style={{ height: "100%" }}
    >
      <h1>{title}</h1>
      <h4>{desc}</h4>
      {demo && (
        <h4>
          <OutboundLink
            className="is-special-blue"
            href={demo}
            target="_blank"
            rel="noopener noreferrer"
          >
            See the demo!
          </OutboundLink>
        </h4>
      )}

      <h4>Get set up by typing the following command in your terminal:</h4>

      <p className="pad-3 is-grey-bg-always is-white-always border-radius">
        {`npx -p yo -p generator-sld -- yo sld:${flag}`}
      </p>

      <h4>
        Or check out the{" "}
        <OutboundLink
          className="is-special-blue"
          href={repo}
          target="_blank"
          rel="noopener noreferrer"
        >
          git repo
        </OutboundLink>
      </h4>
    </div>
  </div>
)
export default function Start({ data, location }) {
  const boilerplates = data.allMdx.edges
  return (
    <Layout>
      <SEO title="Boilerplates" location={location} />
      <div className="is-grey is-light-grey-bg">
        <div className="row container-small pad-5-t pad-3-lr pad-3-lr">
          <div className="col-xs-12 col-md-6 ">
            <h3 className="margin-0-b margin-1-l">BOILERPLATES</h3>
          </div>
        </div>
      </div>
      <div className="is-light-grey-bg is-grey pad-5-b">
        <div className="row container-small pad-10-b">
          {boilerplates.map((item) => (
            <BoilerPlate {...item.node.frontmatter} />
          ))}
        </div>
      </div>
    </Layout>
  )
}

export const query = graphql`
  {
    allMdx(
      filter: { frontmatter: { type: { eq: "Boilerplate" } } }
      limit: 1000
    ) {
      edges {
        node {
          frontmatter {
            title
            desc
            demo
            flag
            repo
          }
        }
      }
    }
  }
`
