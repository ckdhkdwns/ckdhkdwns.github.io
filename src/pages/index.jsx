import React, { useState, useCallback } from "react"
import _ from "lodash"
import styled from "styled-components"
import { graphql } from "gatsby"

import Layout from "components/Layout"
import Title from "components/Title"
import SEO from "components/SEO"
import Bio from "components/Bio"
import PostList from "components/PostList"
import SideTagList from "components/SideTagList"
import Divider from "components/Divider"
import TextField from "components/TextField"
import VerticalSpace from "components/VerticalSpace"

import { title, description, siteUrl } from "../../blog-config"


const SearchWrapper = styled.div`
  margin-top: 20px;
  @media (max-width: 768px) {
    padding: 0 15px;
  }
`
const IndexDivider = styled.div`
  margin-top: 40px;
  border-bottom: 1px solid ${props => props.theme.colors.divider};
`
const BlogIndex = ({ data }) => {
  const posts = data.allMarkdownRemark.nodes
  const tags = _.sortBy(data.allMarkdownRemark.group, ["totalCount"]).reverse()

  const [query, setQuery] = useState("")

  const filteredPosts = useCallback(
    posts.filter(post => {
      const { frontmatter, rawMarkdownBody } = post
      const { title } = frontmatter
      const lowerQuery = query.toLocaleLowerCase()

      
      if (rawMarkdownBody && rawMarkdownBody.toLocaleLowerCase().includes(lowerQuery)) return true

      return title.toLocaleLowerCase().includes(lowerQuery)
    }),
    [query]
  )

  if (posts.length === 0) {
    return (
      <p>
        No blog posts found. Add markdown posts to &quot;content/blog&quot; (or
        the directory you specified for the &quot;gatsby-source-filesystem&quot;
        plugin in gatsby-config.js).
      </p>
    )
  }

  return (
    <Layout>
      <SEO title={title} description={description} url={siteUrl} />
      <VerticalSpace size={48} />
      <Bio />
      <IndexDivider />
      <SearchWrapper>
        <TextField
          onChange={e => setQuery(e.target.value)}
          placeholder="Search"
        />
      </SearchWrapper>
      <VerticalSpace size={20} />
      <SideTagList tags={tags} postCount={posts.length} />
      <PostList postList={filteredPosts} />
    </Layout>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
      nodes {
        excerpt(pruneLength: 200, truncate: true)
        fields {
          slug
        }
        frontmatter {
          date(formatString: "MMMM DD, YYYY")
          update(formatString: "MMM DD, YYYY")
          title
          tags
        }
      }
    }
  }
`
