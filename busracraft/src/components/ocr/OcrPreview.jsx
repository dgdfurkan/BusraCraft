import Button from '../ui/Button'
import Icon from '../ui/Icon'

export default function OcrPreview({ result, onAccept, onRetry }) {
  if (!result) return null

  return (
    <div className="space-y-5">
      <div className="bg-primary/5 p-5 rounded-2xl space-y-4 border border-primary/10">
        {result.title && (
          <div>
            <div className="flex items-center gap-1.5 mb-1">
              <Icon name="title" size="text-sm" className="text-primary" />
              <label className="text-xs font-semibold text-text-secondary uppercase tracking-wide">Tarif Adı</label>
            </div>
            <p className="text-sm font-bold text-text">{result.title}</p>
          </div>
        )}

        {result.steps?.length > 0 && (
          <div>
            <div className="flex items-center gap-1.5 mb-2">
              <Icon name="format_list_numbered" size="text-sm" className="text-primary" />
              <label className="text-xs font-semibold text-text-secondary uppercase tracking-wide">
                Adımlar ({result.steps.length})
              </label>
            </div>
            <div className="space-y-1.5">
              {result.steps.map((step, i) => (
                <p key={i} className="text-xs text-text leading-relaxed">
                  <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-primary/10 text-primary text-[10px] font-bold mr-1.5">
                    {step.order || i + 1}
                  </span>
                  {step.text}
                </p>
              ))}
            </div>
          </div>
        )}

        {result.notes && (
          <div>
            <div className="flex items-center gap-1.5 mb-1">
              <Icon name="sticky_note_2" size="text-sm" className="text-primary" />
              <label className="text-xs font-semibold text-text-secondary uppercase tracking-wide">Notlar</label>
            </div>
            <p className="text-xs text-text leading-relaxed">{result.notes}</p>
          </div>
        )}
      </div>

      <div className="flex gap-3">
        <Button onClick={onAccept} icon="check" className="flex-1">
          Kullan
        </Button>
        <Button variant="secondary" onClick={onRetry} icon="refresh">
          Tekrar Dene
        </Button>
      </div>
    </div>
  )
}
