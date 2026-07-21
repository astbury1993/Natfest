import { describe, it, expect, vi, beforeEach } from 'vitest';
import { buildCloudinaryUrl } from './cloudinary';

describe('buildCloudinaryUrl', () => {
  beforeEach(() => {
    vi.stubEnv('VITE_CLOUDINARY_CLOUD_NAME', 'test-cloud');
  });

  it('builds a thumbnail URL with correct transforms', () => {
    const url = buildCloudinaryUrl('natfest/gallery/acts/img001', 'thumbnail');
    expect(url).toBe(
      'https://res.cloudinary.com/test-cloud/image/upload/c_fill,w_400,h_267,f_auto,q_auto/natfest/gallery/acts/img001'
    );
  });

  it('builds a medium URL with correct transforms', () => {
    const url = buildCloudinaryUrl('natfest/gallery/crowd/img002', 'medium');
    expect(url).toBe(
      'https://res.cloudinary.com/test-cloud/image/upload/c_limit,w_1200,f_auto,q_auto/natfest/gallery/crowd/img002'
    );
  });

  it('builds a full URL with correct transforms', () => {
    const url = buildCloudinaryUrl('natfest/gallery/acts/img003', 'full');
    expect(url).toBe(
      'https://res.cloudinary.com/test-cloud/image/upload/c_limit,w_2400,f_auto,q_auto/natfest/gallery/acts/img003'
    );
  });

  it('defaults to medium variant when no variant specified', () => {
    const url = buildCloudinaryUrl('natfest/gallery/acts/img004');
    expect(url).toContain('c_limit,w_1200,f_auto,q_auto');
  });

  it('falls back to medium when an invalid variant is provided', () => {
    const url = buildCloudinaryUrl('natfest/gallery/acts/img005', 'invalid');
    expect(url).toContain('c_limit,w_1200,f_auto,q_auto');
  });

  it('includes the cloud name from env', () => {
    const url = buildCloudinaryUrl('any/id', 'thumbnail');
    expect(url).toContain('res.cloudinary.com/test-cloud');
  });
});
