import React from 'react'
import ReactMarkdown from 'react-markdown'
import Prism from 'prismjs'
import 'prismjs/themes/prism-coy.css'


function CodeBlock(props) {
  let html = Prism.highlight(props.literal, Prism.languages[props.language]);
  let cls = 'language-' + props.language;

  return (
    <pre className={cls}>
          <code dangerouslySetInnerHTML={{__html: html}} className={cls}/>
      </pre>
  )
}

const Markdown = ({source, show = true}) =>(
  <div style={{marginTop:'50px', display: show ? 'block' : 'none'}}>
    <ReactMarkdown source={source} renderers={{CodeBlock: CodeBlock}} />
  </div>

);

export default Markdown;