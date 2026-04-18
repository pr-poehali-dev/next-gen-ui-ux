export default function Featured() {
  return (
    <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center min-h-screen px-6 py-12 lg:py-0 bg-white">
      <div className="flex-1 text-left lg:h-[800px] flex flex-col justify-center lg:mr-12">
        <h3 className="uppercase mb-4 text-sm tracking-wide text-neutral-600">Всё для школьной жизни</h3>
        <p className="text-2xl lg:text-4xl mb-8 text-neutral-900 leading-tight">
          Репетиторы, канцелярия, дополнительные занятия, экскурсии — выбирай нужную услугу и оформляй заказ за минуту. Без очередей и лишних звонков.
        </p>
        <button className="bg-black text-white border border-black px-4 py-2 text-sm transition-all duration-300 hover:bg-white hover:text-black cursor-pointer w-fit uppercase tracking-wide">
          Смотреть услуги
        </button>
      </div>
    </div>
  );
}