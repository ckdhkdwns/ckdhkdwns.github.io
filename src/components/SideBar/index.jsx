import SeriesList from "components/SeriesList"
import React from "react"
import styled from "styled-components"
import { flow, map, groupBy, sortBy, filter, reverse } from "lodash/fp"


const Wrapper = styled.div`
    
`
const SideBar = ({ data }) => {
    const posts = data.allMarkdownRemark.nodes    
    const series = flow(
        map(post => ({ ...post.frontmatter, slug: post.fields.slug })),
        groupBy("series"),
        map(series => ({
          name: series[0].series,
          posts: series,
          lastUpdated: series[0].date,
        })),
        sortBy(series => new Date(series.lastUpdated)),
        filter(series => series.name),
        reverse
      )(posts)
    return (
        <Wrapper>
            <SeriesList seriesList={series} />
        </Wrapper>
    )
}

export default SideBar