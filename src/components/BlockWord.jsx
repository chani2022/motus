import { memo } from "react"

function BlockWord({ children, className }) {

    return (
        <div className={className} style={{ width: '50px', height: '50px' }}>
            {children}
        </div>
    )
}

export default memo(BlockWord)
