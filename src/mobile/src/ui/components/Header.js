import React, { PureComponent } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Styling } from 'ui/theme/general';
import PropTypes from 'prop-types';
import { Icon } from 'ui/theme/icons';
import { height, width } from 'libs/dimensions';

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: height / 16,
    },
    header: {
        fontFamily: 'SourceSansPro-Light',
        textAlign: 'center',
        width: Styling.contentWidth,
        paddingTop: height / 16,
        alignItems: 'center',
    },
});

export default class Header extends PureComponent {
    static propTypes = {
        /* Heading text content */
        children: PropTypes.string,
        /* Heading text color */
        textColor: PropTypes.string.isRequired,
        /* Heading text size */
        textSize: PropTypes.number,
    };

    static defaultProps = {
        textSize: Styling.fontSize6
    }

    render() {
        const { children, textSize, textColor } = this.props;

        return (
            <View style={styles.container}>
                <Icon name="iota" size={width / 8} color={textColor} />
                {children && <Text style={[styles.header, { color: textColor, fontSize: textSize, lineHeight: textSize * 1.5 }]}>{children}</Text>}
            </View>
        );
    }
}
