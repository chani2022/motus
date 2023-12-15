import { memo } from "react"

function DivRow({ children }) {
    return (
        <div className="row">
            {children}
        </div>
    )
}
export default memo(DivRow)
