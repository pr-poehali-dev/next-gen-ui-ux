import { useScroll, useTransform, motion, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";

export default function Hero() {
  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0vh", "50vh"]);

  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ phone: "", school: "", service: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div
      ref={container}
      className="relative flex items-center justify-center h-screen overflow-hidden"
    >
      <motion.div
        style={{ y }}
        className="absolute inset-0 w-full h-full"
      >
        <img
          src="/images/mountain-landscape.jpg"
          alt="Mountain landscape"
          className="w-full h-full object-cover"
        />
      </motion.div>

      <div className="relative z-10 text-center text-white">
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6">
          ШКОЛЬНЫЙ ПРИЗРАК
        </h1>
        <p className="text-lg md:text-xl max-w-2xl mx-auto px-6 opacity-90">
          Закажи любую школьную услугу в пару кликов — быстро, удобно и надёжно
        </p>
        <button
          onClick={() => setOpen(true)}
          className="mt-8 bg-white text-black px-8 py-3 text-sm uppercase tracking-wide font-semibold hover:bg-neutral-200 transition-colors duration-300 cursor-pointer"
        >
          Заказать услугу
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4"
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="bg-white w-full max-w-md p-8"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-xl font-bold uppercase tracking-wide mb-6 text-neutral-900">Оформить заказ</h2>
              <div className="flex flex-col gap-4">
                <div>
                  <label className="text-xs uppercase tracking-wide text-neutral-500 mb-1 block">Номер телефона</label>
                  <input
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="+7 999 000 00 00"
                    className="w-full border border-neutral-300 px-4 py-3 text-sm outline-none focus:border-black transition-colors"
                  />
                </div>
                <div>
                  <label className="text-xs uppercase tracking-wide text-neutral-500 mb-1 block">Школа</label>
                  <input
                    name="school"
                    value={form.school}
                    onChange={handleChange}
                    placeholder="Название или номер школы"
                    className="w-full border border-neutral-300 px-4 py-3 text-sm outline-none focus:border-black transition-colors"
                  />
                </div>
                <div>
                  <label className="text-xs uppercase tracking-wide text-neutral-500 mb-1 block">Услуга</label>
                  <input
                    name="service"
                    value={form.service}
                    onChange={handleChange}
                    placeholder="Что нужно заказать?"
                    className="w-full border border-neutral-300 px-4 py-3 text-sm outline-none focus:border-black transition-colors"
                  />
                </div>
              </div>
              <div className="flex gap-3 mt-8">
                <button
                  onClick={() => setOpen(false)}
                  className="flex-1 border border-neutral-300 py-3 text-sm uppercase tracking-wide hover:bg-neutral-100 transition-colors cursor-pointer"
                >
                  Отмена
                </button>
                <button
                  onClick={() => setOpen(false)}
                  className="flex-1 bg-black text-white py-3 text-sm uppercase tracking-wide hover:bg-neutral-800 transition-colors cursor-pointer"
                >
                  Отправить
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}