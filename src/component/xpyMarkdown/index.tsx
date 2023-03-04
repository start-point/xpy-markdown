import React, {useEffect, useRef, useState} from 'react';
import ReactMarkdown from 'react-markdown';
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter';
// 具体引入查看地址 https://github.com/react-syntax-highlighter/react-syntax-highlighter/blob/master/AVAILABLE_STYLES_PRISM.MD
import {oneLight} from 'react-syntax-highlighter/dist/esm/styles/prism';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import rehypeRaw from 'rehype-raw'; // 支持html
import styles from './style.less';

import {Space} from '@/component/Space';

const DEFAULT_SIZE = 500 //默认代码块高度

const markdown = "";

export const XpyMarkdown = ({height = DEFAULT_SIZE }) => {

    // const textareaRef = useRef();
    // const articleRef = useRef();
    const [state,setState] = useState({
        markdown: markdown,
    });

    const handleInputMarkdown = (e) => {
        let previewHeight = 500;
        let textareaHeight = e.target.scrollHeight;
        let height = Math.max(previewHeight, textareaHeight, DEFAULT_SIZE);
        setState({ markdown: e.target.value });
    }

    const handleKeyPressMarkdown = (e) => {
        let previewHeight = 500;
        let textareaHeight = e.target.scrollHeight;
        let height = Math.max(previewHeight, textareaHeight, DEFAULT_SIZE);
        //下面是自定义的特殊按键触发的效果
        if (e.keyCode === 9) {
            e.preventDefault();
            // this.props.editMarkdown(this.props.markdown + '\t')
        } else if (e.keyCode === 13)
            return false
        else if (e.keyCode === 17) { //left ctrl
            // this.setState({ textareaHeight: height })
        } else if (e.keyCode === 8) { //backspace
            // this.setState({ textareaHeight: height })
        } else if (e.keyCode === 192) { // ~
            // e.preventDefault()
        }
    }


    // useEffect(()=>{
    //     window.addEventListener("scroll",handlerScroll,true);
    // },[])

    return (
        <div className={styles.xpyMarkdown}>
            <div className={styles.xpyMarkdownTitle}>
                <Space size={[2,10]}>
                    <p>1111</p>
                    <p>123</p>
                    <p>123</p>
                </Space>
            </div>
            <div className={styles.xpyMarkdownMain} style={{height: height,}}>
                <textarea className={styles.textarea} spellCheck={false} value={state.markdown}
                          onKeyDown={handleKeyPressMarkdown}
                          onChange={handleInputMarkdown}/>
                <div className={styles.article}>
                    <ReactMarkdown
                        children={state.markdown}
                        remarkPlugins={[remarkMath]}
                        rehypePlugins={[rehypeKatex,rehypeRaw,remarkGfm]}
                        components={{
                            code({node, inline, className, children, ...props}) {
                                const match = /language-(\w+)/.exec(className || '')
                                return !inline && match ? (
                                    <SyntaxHighlighter
                                        children={String(children).replace(/\n$/, '')}
                                        style={oneLight}
                                        language={match[1]}
                                        PreTag="div"
                                        {...props}
                                    />
                                ) : (
                                    <code className={className} {...props}>
                                        {children}
                                    </code>
                                )
                            }
                        }}
                    />
                </div>
            </div>
        </div>
    )
}