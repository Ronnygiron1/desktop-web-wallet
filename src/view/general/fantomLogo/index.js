import React from 'react';
import PropTypes from 'prop-types';
/**
 * FantomLogo : A svg file for rendering fantom logo in application.
 *
 * logoType: For small icon pass {2} as props, for larger one pass {1}.
 *
 */

class FantomLogo extends React.PureComponent {
  render() {
    const style = {
      fill: '#000100',
    };
    const { width, height, logoType } = this.props;

    if (logoType === 1) {
      const viewWidth = width || 1042;
      const viewHeight = height || 245;
      return (
        <svg
          id="Layer_1"
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox={`0 0 ${viewWidth} ${viewHeight}`}
        >
          <polygon
            style={style}
            points="251.29 63.38 251.29 177.26 275.29 177.26 275.29 129.38 340.29 129.38 340.29 105.38 275.29 105.38 275.29 87.21 353.46 87.21 353.46 63.38 251.29 63.38"
          />
          <path
            style={style}
            d="M431.46,63.38H403.62l-47.5,113.88h26.17l13-29.88H441l13,29.88h26.5Zm-29.34,66L418,92.29l16,37.09Z"
          />
          <polygon
            style={style}
            points="498.46 63.38 498.46 177.26 522.62 177.26 522.62 107.05 578.62 177.26 606.29 177.26 606.29 63.38 581.29 63.38 581.62 133.54 525.29 63.38 498.46 63.38"
          />
          <polygon
            style={style}
            points="632.29 63.38 632.29 88.05 670.62 88.05 670.62 177.26 695.29 177.26 695.29 88.05 734.12 88.05 734.12 63.38 632.29 63.38"
          />
          <path
            style={style}
            d="M840.61,63.38H775.8a18.51,18.51,0,0,0-18.51,18.51v76.86a18.51,18.51,0,0,0,18.51,18.51h64.81a18.51,18.51,0,0,0,18.51-18.51V81.89A18.51,18.51,0,0,0,840.61,63.38Zm-5.15,90h-54v-66h54Z"
          />
          <polygon
            style={style}
            points="887.46 63.38 887.46 177.26 912.46 177.26 912.46 102.21 953.46 155.04 995.46 102.55 995.46 177.26 1019.46 177.26 1019.46 63.38 994.62 63.38 953.46 115.38 913.12 63.38 887.46 63.38"
          />
          <path
            style={style}
            data-name="Path 1144"
            d="M99.13,87.15l40.12-23.21v46.37Zm40.12,98.93L86.37,216.67,33.46,186.11V132.33l52.91,30.54,52.88-30.54ZM33.46,63.94,73.62,87.15,33.46,110.36Zm59.28,34.2,40.16,23.21L92.74,144.56ZM80,144.49,39.87,121.28,80,98.07v46.42Zm52.94-91.63L86.39,79.77h0l-46.6-26.9L86.37,26ZM20.72,49.17v144.3l65.65,37.9L152,193.44V49.17L86.37,11.26Z"
          />
        </svg>
      );
    }
    if (logoType === 2) {
      const viewWidth = width || 90;
      const viewHeight = height || 21.16;
      return (
        <svg
          id="Layer_1"
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox={`0 0 ${viewWidth} ${viewHeight}`}
        >
          <polygon
            style={style}
            points="20.78 5.36 20.78 15.62 22.94 15.62 22.94 11.31 28.8 11.31 28.8 9.14 22.94 9.14 22.94 7.51 29.98 7.51 29.98 5.36 20.78 5.36"
          />
          <path
            style={style}
            d="M37,5.36H34.5L30.22,15.62h2.36l1.17-2.69h4.12L39,15.62h2.39Zm-2.64,6L35.8,8l1.44,3.34Z"
          />
          <polygon
            style={style}
            points="43.05 5.36 43.05 15.62 45.23 15.62 45.23 9.29 50.27 15.62 52.77 15.62 52.77 5.36 50.52 5.36 50.55 11.68 45.47 5.36 43.05 5.36"
          />
          <polygon
            style={style}
            points="55.11 5.36 55.11 7.58 58.56 7.58 58.56 15.62 60.79 15.62 60.79 7.58 64.29 7.58 64.29 5.36 55.11 5.36"
          />
          <path
            style={style}
            d="M73.88,5.36H68A1.66,1.66,0,0,0,66.38,7V14A1.66,1.66,0,0,0,68,15.62h5.84A1.67,1.67,0,0,0,75.55,14V7A1.67,1.67,0,0,0,73.88,5.36Zm-.46,8.11H68.55v-6h4.87Z"
          />
          <polygon
            style={style}
            points="78.11 5.36 78.11 15.62 80.36 15.62 80.36 8.86 84.05 13.62 87.84 8.89 87.84 15.62 90 15.62 90 5.36 87.76 5.36 84.05 10.04 80.42 5.36 78.11 5.36"
          />
          <path
            id="Path_1144"
            data-name="Path 1144"
            d="M7.07,7.5l3.61-2.09V9.59Zm3.61,8.92L5.92,19.17,1.15,16.42V11.57l4.77,2.76,4.76-2.76Zm-9.53-11L4.77,7.5,1.15,9.59ZM6.49,8.49l3.62,2.09L6.49,12.67ZM5.34,12.67,1.73,10.58,5.34,8.49v4.17Zm4.77-8.26L5.92,6.84h0L1.72,4.41,5.92,2ZM0,4.08v13L5.92,20.5l5.91-3.42v-13L5.92.66Z"
          />
        </svg>
      );
    }
    return null;
  }
}
FantomLogo.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  logoType: PropTypes.number.isRequired,
};
export default FantomLogo;
