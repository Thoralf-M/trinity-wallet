import assign from 'lodash/assign';
import noop from 'lodash/noop';
import React from 'react';
import PropTypes from 'prop-types';
import { shallow } from 'enzyme';
import { MainSettings } from 'ui/views/wallet/MainSettings';
import theme from '../../../../__mocks__/theme';

jest.mock('react-native-is-device-rooted', () => ({
    isDeviceRooted: () => true,
    isDeviceLocked: () => false,
}));

jest.mock('react-native-camera', () => {});
jest.mock('rn-fetch-blob', () => {});

jest.mock('rn-fetch-blob', () => {});

jest.mock('bugsnag-react-native', () => ({
    Configuration: jest.fn(),
    Client: jest.fn(() => ({ leaveBreadcrumb: jest.fn() })),
}));

jest.mock('react-native-share', () => {});

const getProps = (overrides) =>
    assign(
        {},
        {
            currency: 'USD',
            mode: 'Standard',
            theme,
            themeName: 'custom',
            setSetting: noop,
            toggleModalActivity: noop,
            t: (arg) => arg,
        },
        overrides,
    );

describe('Testing MainSettings component', () => {
    describe('propTypes', () => {
        it('should require a currency string as a prop', () => {
            expect(MainSettings.propTypes.currency).toBe(PropTypes.string.isRequired);
        });

        it('should require a mode string as a prop', () => {
            expect(MainSettings.propTypes.mode).toBe(PropTypes.string.isRequired);
        });

        it('should require a setSetting function as a prop', () => {
            expect(MainSettings.propTypes.setSetting).toBe(PropTypes.func.isRequired);
        });

        it('should require a t function as a prop', () => {
            expect(MainSettings.propTypes.t).toEqual(PropTypes.func.isRequired);
        });

        it('should require a theme object as a prop', () => {
            expect(MainSettings.propTypes.theme).toEqual(PropTypes.object.isRequired);
        });

        it('should require a toggleModalActivity function as a prop', () => {
            expect(MainSettings.propTypes.toggleModalActivity).toEqual(PropTypes.func.isRequired);
        });
    });

    describe('when renders', () => {
        describe('initially', () => {
            it('should not explode', () => {
                const props = getProps();
                const wrapper = shallow(<MainSettings {...props} />);
                expect(wrapper.name()).toBe('View');
            });

            it('should return a View component as an immediate child', () => {
                const props = getProps();
                const wrapper = shallow(<MainSettings {...props} />);
                expect(wrapper.childAt(0).name()).toBe('View');
            });
        });
    });
});
