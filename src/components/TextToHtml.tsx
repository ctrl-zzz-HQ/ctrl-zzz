export default function TextToHtml({ html=false, text }: Props) {

  return (
    <>
      {text.split('\n').map((line, i) => {
        if (line.trim().length === 0) {
          return <br key={i}></br>;
        } else {
          if (html) {
            return <p key={i} dangerouslySetInnerHTML={{__html: line}}></p>;
          } else {
            return <p key={i}>{line}</p>;
          }
        }
      })}
    </>
  );
}

interface Props {
  html?: boolean;
  text: string;
}
