import React from 'react';
import MenuSection from './MenuSection';
import SelectedDisplay from './MenuSections/SelectedDisplay';
import NavigateSection from './MenuSections/NavigateSection';
import MapSettings from './MenuSections/MapSettings';
import MapStats from './MenuSections/MapStats';
import { connect } from 'react-redux';
import { reduxConstants } from '../redux/actions';
import BuildSection from './MenuSections/BuildSection';

function Menu({ socket, curMode, buildActionHandler, updateLocationName }) {
    return (
        <div
            style={{
                background: '#ffffffcc',
                margin: 10,
                display: 'flex',
                flexDirection: 'column',
                flexWrap: 'wrap',
                justifyContent: 'space-between',
                width: 300,
                position: 'fixed',
                borderRadius: 5,
            }}
        >
            <MenuSection sectionName="Selected Component">
                <SelectedDisplay updateLocationName={updateLocationName} />
            </MenuSection>
            <MenuSection sectionName="Navigator">
                {curMode === reduxConstants.APP_MODE_LIST.VIEW_MAP ? (
                    <NavigateSection socket={socket} />
                ) : (
                    <BuildSection buildActionHandler={buildActionHandler} />
                )}
            </MenuSection>
            <MenuSection sectionName="Map Stats">
                <MapStats />
            </MenuSection>
            <MenuSection sectionName="Map Settings">
                <MapSettings />
            </MenuSection>
        </div>
    );
}

const mapStateToProps = (state) => {
    return { curMode: state.curMode };
};

export default connect(mapStateToProps)(Menu);
