let status = 0; // 0:还没数据，-1:不支持，1:支持

/**
 * 判断当前设置是否支持constant(safe-area-inset-top)或env(safe-area-inset-top)；
 * 部分Android设备，可以认识safa-area-inset-top，但会将其识别为0
 * @returns {boolean} 当前设备是否支持安全距离
 */
export const supportSafeArea = () => {
    if (status !== 0) {
        // 缓存数据，只向 body 插入一次 dom 即可
        return status === 1;
    }
    const div = document.createElement('div');
    const id = 'test-check-safe-area';
    const styles = [
        'position: fixed',
        'z-index: -1',
        'height: constant(safe-area-inset-top)',
        'height: env(safe-area-inset-top)',
    ];
    div.style.cssText = styles.join(';');
    div.id = id;
    document.body.appendChild(div);
    const areaDiv = document.getElementById(id);
    if (areaDiv) {
        status = areaDiv.offsetHeight > 0 ? 1 : -1; // 该 div 的高度是否为 0
        areaDiv.parentNode?.removeChild(areaDiv);
    }
    return status === 1;
};
