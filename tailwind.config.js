module.exports = {
    content: ['./src/**/*.{wxml,js,ts}'],
    theme: {
        extend: {
            colors: {
                blue: {
                    base: '#28aedb',
                    '008':'#0088D5'
                },
                gray: {
                    dark: '#333333',
                    light: '#a0a0a0',
                    border: '#eeeeee',
                    font1: '#c5c5c5',
                    font666: '#666666',
                    e9: '#e9e9e9',
                    e6: '#e6e6e6',
                    button: '#C1C1C1',
                    bg: '#f5f5f5',
                    625: '#625A69',
                    ded: '#dedede',
                    bbb: '#bbbbbb'
                },
                red: {
                    buttonfrom: '#E70316',
                    buttonto: '#FF5B68',
                    notifyfrom: '#FFDBDB',
                    notifyto: '#ffd8d8',
                    notifycenter: '#fff1d9',
                    light: '#ffe5e5',
                    heavy: '#E70316',
                    font: '#ffd8db',
                    3434: '#ff3434',
                    a494: '#ffa494'

                },
                yellow: {
                    from: '#ffe00f',
                    to: '#ffb81e',
                    form1: '#FFF9CE',
                    to1: '#FFE09B'
                },
                green: {
                    wx: '#07c160',
                    button: '#0EA961'
                }
            },
            fontSize: {
                big: '46rpx',
                title: '40rpx',
                normal: '28rpx',
                16: '16rpx',
                18: '18rpx',
                24: '24rpx',
                26: '26rpx',
                32: '32rpx',
                36: '36rpx',
            },
            margin: {
                bg: '32rpx',
                36: '36rpx',
                common: '20rpx',
                24: '24rpx'
            },
            padding: {
                bg: '24rpx',
                fm: '26rpx',
                36: '36rpx',
                common: '20rpx'
            },
            width: {
                fullbutton: '560rpx',
                normalbutton: '270rpx',
                '1/9': '11.11111111111%',
                'onethird': '33.33333333333%',
                '1/5': '20%',
                '1/6': '16.666666666667%',
                '1/7': '14.285714285714%',
                '1/8': '12.5%',
                main: '686rpx',
            // ]rpx',
                middleImage: '194rpx'
            },
            height: {
                button: '90rpx',
                safe: '98vh',
                smbutton: '60rpx',
                middleImage: '194rpx'
            },
            lineHeight: {
                button: '90rpx',
                smbutton: '60rpx'
            },
            boxShadow: {
                common: '0px 6px 20px rgba(84,84,84,0.1900)'
            },
            backgroundImage: {
                'gradient-to-87': 'linear-gradient(87deg, var(--tw-gradient-stops))'
            },
            borderRadius: {
                comm: '16rpx'
            }
        }
    },
    plugins: [],
    corePlugins: {
        preflight: false
    }
}