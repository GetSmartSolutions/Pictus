import React from "react"
import { graphql } from "gatsby"
import Layout from '../templates/layout'
import Module from "../templates/module"

const PricingPage = ({
  data
}) => {
  const { header, footer, pricingBlock, modules } = data

  modules.edges.sort(function(a, b) {
    return a.node.frontmatter.order - b.node.frontmatter.order
  })

  const features = modules.edges.filter(module => !module.node.frontmatter.addOn)
  const addOns = modules.edges.filter(module => module.node.frontmatter.addOn)

  const Modules = features.map((edge) => <Module key={edge.node.frontmatter.title} module={edge} />)
  const AddOns = addOns.map((edge) => <Module key={edge.node.frontmatter.title} module={edge} />)

  return (
    <Layout header={header} footer={footer}>
      <div className="secondary-intro-block">
        <div className="secondary-intro-text">
          <h2 className="secondary-intro-header">{pricingBlock.frontmatter.title}</h2>
          <div className="secondary-intro-subtext">
            {pricingBlock.frontmatter.subtext}
          </div>
        </div>
      </div>

      <div>{Modules}</div>

      <h2 className="section-header--small">
        Add these to any of our other modules!
      </h2>
      <div>{AddOns}</div>
    </Layout>
  )
}

export default PricingPage

export const pageQuery = graphql`
  query {
    modules: allMarkdownRemark(filter: {fileAbsolutePath: {regex: "/(modules)/.*.md$/"}}) {
      edges {
        node {
          html
          frontmatter {
            title
            order
            requirement
            addOn
          }
        }
      }
    },
    pricingBlock: markdownRemark(frontmatter: {id: {eq: "PricingBlock"}}) {
      frontmatter {
        id
        image
        subtext
        title
      }
    },
    header: markdownRemark(frontmatter: {id: {eq: "Logo"}}) {
      frontmatter {
        id
        image
      }
      html
    },
    footer: markdownRemark(frontmatter: {id: {eq: "Footer"}}) {
      frontmatter {
        id
        image
      }
    }
  }
`