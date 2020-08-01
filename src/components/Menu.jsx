import React from 'react';
import MenuSection from './MenuSection';
import SelectedDisplay from './MenuSections/SelectedDisplay';
import NavigateSection from './MenuSections/NavigateSection';
import MenuSettings from './MenuSections/MenuSettings';
import MapStats from './MenuSections/MapStats';
import { connect } from 'react-redux';

function Menu({ socket }) {   
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
                <SelectedDisplay />
            </MenuSection>
            <MenuSection sectionName="Navigator">
                <NavigateSection socket={socket} />
            </MenuSection>
            <MenuSection sectionName="Map Stats">
                <MapStats />
            </MenuSection>
            <MenuSection sectionName="Menu Settings">
                <MenuSettings />
            </MenuSection>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {};
};

export default connect(mapStateToProps)(Menu);
