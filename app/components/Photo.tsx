type Props = {
  name: 'review-room' | 'infrastructure' | 'evidence-review';
  alt: string;
  className?: string;
  priority?: boolean;
};

export default function Photo({ name, alt, className = '', priority = false }: Props) {
  const portrait = name === 'review-room';
  return <picture className={'editorial-photo ' + className}>
    <source media="(max-width: 760px)" srcSet={'/media/' + name + (portrait ? '-512.webp' : '-768.webp')} />
    <img src={'/media/' + name + (portrait ? '-1024.webp' : '-1536.webp')} alt={alt} width={portrait ? 1024 : 1536} height={portrait ? 1536 : 1024} loading={priority ? 'eager' : 'lazy'} fetchPriority={priority ? 'high' : 'auto'} decoding="async" />
  </picture>;
}
