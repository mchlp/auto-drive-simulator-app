import React from 'react';

export default function SelectedDisplay({ componentData }) {
    let Content;
    if (componentData) {
        Content = (
            <div>
                <div className="font-weight-bold">Current Component</div>
                <div>Type: {componentData.type}</div>
                <div>ID: {componentData.id}</div>
                <div>
                    Coord: {JSON.stringify(componentData.data.coord, null, 4)}
                </div>
            </div>
        );
    } else {
        Content = <div className="font-weight-bold">No component selected</div>;
    }

    return (
        <div
            style={{
                fontSize: 12,
            }}
        >
            {Content}
        </div>
    );
}
