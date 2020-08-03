const breakpointsInt = {
    small: 768,
    large: 1170,
};

const breakpoints = {
};

Object.keys(breakpointsInt).map(function(key, index) {
    breakpoints[key] = breakpointsInt[key] + 'px';
  });

const mq = Object.values(breakpoints).map(
    bp => `@media (max-width: ${bp})`
  )

const checkViewport = (maxValue) => {
    const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
    return vw <= maxValue;
}

export const isMobile = () => {
    return checkViewport(breakpointsInt.small);
}

export const isTablet = () => {
    return checkViewport(breakpointsInt.large);
}

export const isNormal = () => {
    return !(isMobile() || isTablet());
} 

export const onMobile = mq[0];

export const onTablet = mq[1];