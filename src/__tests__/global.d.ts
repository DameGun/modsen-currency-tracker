declare global {
  const TextDecoder: {
    new (label?: string, options?: TextDecoderOptions): TextDecoder;
    prototype: TextDecoder;
  };
  const TextEncoder: {
    new (): TextEncoder;
    prototype: TextEncoder;
  };
}
