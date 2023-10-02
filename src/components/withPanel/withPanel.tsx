import { ReactNode, PropsWithChildren } from 'react';
import './withPanelStyles.css'

interface WithPanelProps {
    label: string
    children: ReactNode
}

export const WithPanel:React.FC<WithPanelProps> = ({label, children})=>{
    return (
        <div className="panel">

                <div className="panel-block param center-content vertical">
                    <fieldset>
                        <legend><b>{label}</b></legend>
                        {children}
                    </fieldset>
                </div>
        </div>
    )
}

export default WithPanel;