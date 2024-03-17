/**
 * This type represents a serialized event payload. It is a recursive type that
 * works with nested objects as well. It checks if the type `T` extends object.
 * If it does, it maps over the keys of `T` and checks if the value of the key
 * extends an object with a `toJSON` method. If it does, it infers the return
 * type of `toJSON` and uses that as the type. If it doesn't, it recursively
 * applies `SerializedEventPayload` to the value of the key. If `T` does not
 * extend object, it simply uses `T` as the type.
 *
 * @template T The type to be serialized.
 */
export type SerializedEventPayload<T> = T extends object
  ? {
      [K in keyof T]: T[K] extends { toJSON(): infer U }
        ? U
        : SerializedEventPayload<T[K]>;
    }
  : T;

/**
 * This interface represents a serializable event. It is a generic type that
 * can be used with any type `T`. It has four properties:
 * - `streamId`: a string that represents the ID of the stream.
 * - `type`: a string that represents the type of the event.
 * - `position`: a number that represents the position of the event in the stream.
 * - `data`: a `SerializedEventPayload<T>` that represents the data of the event.
 *
 * @template T The type of the data to be serialized.
 */
export interface SerializableEvent<T = any> {
  streamId: string;
  type: string;
  position: number;
  data: SerializedEventPayload<T>;
}
