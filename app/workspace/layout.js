import React from 'react'
import WorkspaceProvider from './provider'

function WorkspaceLayout({ children }) {
    return (
        <div>
            <WorkspaceProvider>
                {children}
            </WorkspaceProvider>
        </div>
    )
}

export default WorkspaceLayout