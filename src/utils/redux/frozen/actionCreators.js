// eslint-disable-next-line import/prefer-default-export
export function frozenInjectState (moreState) {
  return {
    moreState,
    type: 'FROZEN_INJECT_STATE',
  };
}
