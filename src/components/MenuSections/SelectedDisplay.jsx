import React, { useState } from 'react';
import { connect } from 'react-redux';
import { FaPen } from 'react-icons/fa';
import { Input, Form } from 'reactstrap';

function SelectedDisplay({
    hoveredComponent,
    selectedComponent,
    updateLocationName,
}) {
    const [editingName, setEditingName] = useState(false);
    const [newName, setNewName] = useState('');

    const componentData = hoveredComponent || selectedComponent;
    let Content;
    if (componentData) {
        Content = (
            <div>
                <div>Type: {componentData.type}</div>
                {componentData.type === 'location' && (
                    <div>
                        Name:{' '}
                        {editingName && updateLocationName ? (
                            <Form
                                inline
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    updateLocationName(
                                        componentData.id,
                                        newName
                                    );
                                    setEditingName(false);
                                    return false;
                                }}
                            >
                                <Input
                                    style={{
                                        fontSize: 12,
                                    }}
                                    className="my-1"
                                    type="text"
                                    name="component-name"
                                    autoFocus
                                    onBlur={() => {
                                        updateLocationName(
                                            componentData.id,
                                            newName
                                        );
                                        setEditingName(false);
                                    }}
                                    onChange={(event) => {
                                        setNewName(event.target.value);
                                    }}
                                    value={newName}
                                />
                            </Form>
                        ) : componentData.data.name ? (
                            componentData.data.name
                        ) : (
                            <span
                                style={{
                                    color: 'grey',
                                }}
                            >
                                No name set
                            </span>
                        )}
                        {!editingName && updateLocationName && (
                            <FaPen
                                className="ml-2"
                                style={{ cursor: 'pointer' }}
                                onClick={() => {
                                    setNewName(componentData.data.name);
                                    setEditingName(true);
                                }}
                            />
                        )}
                    </div>
                )}
                <div>
                    Coordiantes: [{componentData.data.coord[0].toFixed(3)},{' '}
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
