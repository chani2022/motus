import { memo } from "react"

function BlockWord({ char, className }) {

    return (
        <div className={className} style={{ width: '50px', height: '50px' }}>
            {char}
        </div>
    )
}

export default memo(BlockWord)
