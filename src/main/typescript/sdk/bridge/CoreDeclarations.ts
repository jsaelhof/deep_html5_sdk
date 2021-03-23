/**
 * IMPORTANT
 *
 * This file declares objects provided by the core that are technically available to the game level.
 * This *should not* be abused!
 * Only very specific and direct interfaces with the core should be provided.
 * In fact, everything to be exposed by the core should be exposed through the bridge
 */
declare module deep {
    export var Bridge:deep.sdk.bridge.IBridge;
}
