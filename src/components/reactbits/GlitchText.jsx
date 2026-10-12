// Adapted from React Bits GlitchText (https://github.com/DavidHDev/react-bits), MIT + Commons Clause,
// (c) 2026 David Haz; see ./LICENSE.md. Change: renders any tag (a real heading) and takes its colours as props.
import './GlitchText.css';

export default function GlitchText({
  children,
  as: Tag = 'span',
  speed = 0.5,
  enableOnHover = true,
  colorA = '#FF7A1A',
  colorB = '#2DB0F2',
  background = '#07182F',
  className = '',
}) {
  const style = {
    '--after-duration': `${speed * 3}s`,
    '--before-duration': `${speed * 2}s`,
    '--after-shadow': `-4px 0 ${colorA}`,
    '--before-shadow': `4px 0 ${colorB}`,
    '--glitch-bg': background,
  };
  return (
    <Tag className={`glitch ${enableOnHover ? 'enable-on-hover' : ''} ${className}`} style={style} data-text={children}>
      {children}
    </Tag>
  );
}
