import React from "react"

export default function Template({ testimonial }) {
  return (
    <div className="testimonial-post">
      <div className="testimonial-text">
        <div className="testimonial-description"
            dangerouslySetInnerHTML={{
              __html: testimonial.node.html
            }}
          />
        <div className="testimonial-author">
          <div className="testimonial-person">
            {testimonial.node.frontmatter.person}
          </div>
          <div className="testimonial-company">
            {testimonial.node.frontmatter.company}
          </div>
        </div>
      </div>
    </div>
  )
}
