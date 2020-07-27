import React, { useState } from 'react';
import {
    AiOutlineMinusSquare,
    AiOutlinePlusSquare,
    AiFillMinusSquare,
    AiFillPlusSquare,
} from 'react-icons/ai';

export default function MenuSection({
    sectionName,
    children,
    openInitial = true,
}) {
    const [showChildren, setShowChildren] = useState(openInitial);

    let IconClass;
    if (showChildren) {
        IconClass = AiFillMinusSquare;
    } else {
        IconClass = AiFillPlusSquare;
    }

    return (
        <div className="mx-2 my-2">
            <div
                className="font-weight-bold"
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignContent: 'center',
                    alignItems: 'center',
                }}
            >
                {sectionName}
                <div
                    style={{
                        cursor: 'pointer',
                    }}
                    onClick={() => {
                        setShowChildren((oldShowChildren) => !oldShowChildren);
                    }}
                >
                    <IconClass />
                </div>
            </div>
            {showChildren && <div>{children}</div>}
            <hr className="mb-0" />
        </div>
    );
}
