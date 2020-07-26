import React from 'react';

export default function SelectedDisplay({ componentData }) {
    let Content;
    if (componentData) {
        Content = (
            <div>
                <div>Type: {componentData.type}</div>
                <div>ID: {componentData.id}</div>
                <div>
                    Coord: [{componentData.data.coord[0].toFixed(3)}, {componentData.data.coord[1].toFixed(3)}]
                </div>
            </div>
        );
    } else {
        Content = <div>No component selected</div>;
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
