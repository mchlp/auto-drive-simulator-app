import React from 'react';
import { connect } from 'react-redux';

function SelectedDisplay({ hoveredComponent, selectedComponent }) {
    const componentData = hoveredComponent || selectedComponent;
    let Content;
    if (componentData) {
        Content = (
            <div>
                <div>Type: {componentData.type}</div>
                <div>ID: {componentData.id}</div>
                <div>
                    Coord: [{componentData.data.coord[0].toFixed(3)},{' '}
                    {componentData.data.coord[1].toFixed(3)}]
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

const mapStateToProps = (state) => {
    return {
        selectedComponent: state.selectedComponent,
        hoveredComponent: state.hoveredComponent,
    };
};

export default connect(mapStateToProps)(SelectedDisplay);
