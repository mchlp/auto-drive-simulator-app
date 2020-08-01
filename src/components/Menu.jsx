import React from 'react';
import MenuSection from './MenuSection';
import SelectedDisplay from './SelectedDisplay';
import NavigateSection from './NavigateSection';
import MenuSettings from './MenuSettings';
import MapStats from './MapStats';
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
