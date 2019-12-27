import React from 'react';
import PropTypes from 'prop-types';
import Card from 'react-rainbow-components/components/Card';
import styled from 'styled-components';

// `.react-rainbow-admin-tile {
//     width: 100%;
//     flex-wrap: wrap;
// }

// .react-rainbow-admin-tile:not(:last-child) {
//     margin-right: 24px;
// }

// .react-rainbow-admin-tile_title {
//     letter-spacing: 0.3px;
//     color: #a4a7b5;
// }

// .react-rainbow-admin-tile_title--inverse {
//     color: #e3e5ed;
// }

// .react-rainbow-admin-tile_content {
//     font-size: 28px;
//     line-height: 1.07;
//     letter-spacing: 1.8px;
//     color: #061c3f;

// }

// .react-rainbow-admin-tile_content--inverse {
//     color: #FFF;
// }

// @media (max-width: 800px) {
//     .react-rainbow-admin-tile:not(:last-child) {
//         margin: 0 0 8px 0;
//     }
// }`

const Container = styled(Card)`
    width: 100%;
    flex-wrap: wrap;
    display: flex;
`;

const Title = styled.h2`
    letter-spacing: 0.3px;
    color: #a4a7b5;
`;

const Label = styled.h1`
    font-size: 20px;
    line-height: 1.07;
    letter-spacing: 1.8px;
    color: #061c3f;
`;

export default function Tile(props) {
    const { icon, title, label, style, labelClassName } = props;

    return (
        <Container
            style={style}
            className="rainbow-align-content_space-between rainbow-p-vertical_medium rainbow-p-horizontal_small"
        >
            {icon}
            <div className="rainbow-flex rainbow-flex_column rainbow-align_end">
                <Title className="rainbow-font-size-text_medium">{title}</Title>
                <Label className={`rainbow-p-top_small ${labelClassName}`}>
                    {label}
                </Label>
            </div>
        </Container>
    );
}

Tile.propTypes = {
    icon: PropTypes.node,
    title: PropTypes.string,
    label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    style: PropTypes.object,
    labelClassName: PropTypes.string,
};

Tile.defaultProps = {
    icon: undefined,
    title: undefined,
    label: undefined,
    style: undefined,
    labelClassName: '',
};
