import htmlToPdfmake from 'html-to-pdfmake';
import getConfig from 'next/config';
import pdfMake from 'pdfmake/build/pdfmake';
import { richTextHelperPlainHTML } from './rich-text';

function fonts(baseUrl) {
  return {
    Nunito: {
      normal: `${baseUrl}/fonts/Nunito/Nunito-Regular.ttf`,
      bold: `${baseUrl}/fonts/Nunito/Nunito-Bold.ttf`,
      italics: `${baseUrl}/fonts/Nunito/Nunito-Italic.ttf`,
      bolditalics: `${baseUrl}/fonts/Nunito/Nunito-BoldItalic.ttf`,
    },
  };
}

const uncheckedImageData = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAQAAACROWYpAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAF+2lUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDAgNzkuMTYwNDUxLCAyMDE3LzA1LzA2LTAxOjA4OjIxICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOCAoTWFjaW50b3NoKSIgeG1wOkNyZWF0ZURhdGU9IjIwMTktMTItMzBUMDE6Mzc6MjArMDE6MDAiIHhtcDpNb2RpZnlEYXRlPSIyMDE5LTEyLTMwVDAxOjM4OjU3KzAxOjAwIiB4bXA6TWV0YWRhdGFEYXRlPSIyMDE5LTEyLTMwVDAxOjM4OjU3KzAxOjAwIiBkYzpmb3JtYXQ9ImltYWdlL3BuZyIgcGhvdG9zaG9wOkNvbG9yTW9kZT0iMSIgcGhvdG9zaG9wOklDQ1Byb2ZpbGU9IkRvdCBHYWluIDIwJSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpjMGUyMmJhZC1lY2VkLTQzZWUtYjIzZC1jNDZjOTNiM2UzNWMiIHhtcE1NOkRvY3VtZW50SUQ9ImFkb2JlOmRvY2lkOnBob3Rvc2hvcDo5M2FhOTEzYy1hZDVmLWZmNGEtOWE5Ny1kMmUwZjdmYzFlYmUiIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDozYmY2ODFlMy1hMTRhLTQyODMtOGIxNi0zNjQ4M2E2YmZlNjYiPiA8eG1wTU06SGlzdG9yeT4gPHJkZjpTZXE+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJjcmVhdGVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOjNiZjY4MWUzLWExNGEtNDI4My04YjE2LTM2NDgzYTZiZmU2NiIgc3RFdnQ6d2hlbj0iMjAxOS0xMi0zMFQwMTozNzoyMCswMTowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTggKE1hY2ludG9zaCkiLz4gPHJkZjpsaSBzdEV2dDphY3Rpb249InNhdmVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOmMwZTIyYmFkLWVjZWQtNDNlZS1iMjNkLWM0NmM5M2IzZTM1YyIgc3RFdnQ6d2hlbj0iMjAxOS0xMi0zMFQwMTozODo1NyswMTowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTggKE1hY2ludG9zaCkiIHN0RXZ0OmNoYW5nZWQ9Ii8iLz4gPC9yZGY6U2VxPiA8L3htcE1NOkhpc3Rvcnk+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+6AB6cQAAAPxJREFUOMvF1b1Kw1AYBuAnFf8QL8WlIHQJIriIdyEu4qCTXop7dwenTgUHpYvgJVhob8AuakE+h9hapJqcFDXvFDgPIXlzvgNLjnQ9GlRM340TK7DsUtRI2zqH09txxUzWn3IrhK4DecXs6wjhnqHwZk/K1fIiDAs81krCW54KPBDG8iTcNBIGf4ND1MWTdmrgqIOL5TM0S8SRhmMu1dAo+2DZ57t9eWajtKrvN1GVnrMK9HewhbBy+nPPJbTsJwmymOn8P7fkfLzQGCoG4G4S3vZc4J4QOnY0KyZ3LYQHjqcjf1Qxrx/inDXtWsfNlU1YdeZOP+Gg67mwwTvIDqR1iAowgQAAAABJRU5ErkJggg==';

function checklistFragment() {
  return {
    image: 'unchecked',
    width: 14,
    margin: [14, 22, 14, 0],
    opacity: 0.6,
  };
}

function tableCellContentFor(value, renderAs) {
  switch (renderAs) {
    case 'checklist':
      return {
        stack: [
          htmlToPdfmake(richTextHelperPlainHTML(value.content)),
        ],
        margin: [0, 14, 0, 0],
      };

    default:
      return {
        stack: [
          {
            text: value.title,
            fontSize: 16,
            bold: true,
            lineHeight: 1.2,
            margin: [0, 0, 0, 6],
          },
          htmlToPdfmake(richTextHelperPlainHTML(value.content)),
        ],
        margin: [0, 14, 0, 0],
      };
  }
}

export default function downloadPDF(item) {
  const { publicRuntimeConfig } = getConfig();

  const baseUrl = publicRuntimeConfig.BASE_URL;

  const isChecklist = item.render_as === 'checklist';

  const title = `YSM - ${item.title}`;

  const docDefinition = {
    info: {
      title,
      author: 'Your Story Matters (YSM)',
      creator: 'Your Story Matters (YSM)',
      producer: 'Your Story Matters (YSM)',
    },
    defaultStyle: {
      font: 'Nunito',
      fontSize: 14,
      color: '#242A4A',
    },
    styles: {
      link: {
        color: '#3A4167',
        decoration: 'underline',
        decorationStyle: 'dotted',
      },
    },
    images: {
      logo: `${baseUrl}/logo-with-text.png`,
      unchecked: uncheckedImageData,
    },
    content: [
      {
        image: 'logo',
        width: 50,
        margin: [0, 0, 0, 20],
        alignment: 'center',
      },
      {
        text: item.title,
        fontSize: 18,
        bold: true,
        lineHeight: 1.5,
        alignment: 'center',
      },
      {
        text: 'Original source',
        link: window.location.href,
        alignment: 'center',
        style: ['link'],
        margin: [0, 0, 0, 6],
      },
      {
        text: `Downloaded on: ${(new Date()).toDateString()}`,
        fontSize: 12,
        alignment: 'center',
        margin: [0, 0, 0, 20],
      },
      {
        lineHeight: 1.3,
        layout: 'noBorders',
        table: {
          widths: ['auto', 'auto'],
          body: item.items.map((value) => {
            const leftCell = isChecklist ? checklistFragment() : '';

            return [
              leftCell,
              tableCellContentFor(value, item.render_as),
            ];
          }),
        },
      },
    ],
  };

  pdfMake
    .createPdf(docDefinition, null, fonts(baseUrl))
    .download(title);
}
