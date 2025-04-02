"use client";

import Link from "next/link";
import { motion } from "framer-motion";

import { Button } from "@/app/components/atoms";

export default function NotFound() {
  return (
    <div>
      <main className=" flex h-full items-center justify-center">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <span className="text-8xl md:text-9xl font-bold text-primary">
              404
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            Página não encontrada
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-lg text-muted-foreground mb-8 max-w-md mx-auto"
          >
            A página que você está procurando pode ter sido removida, renomeada
            ou está temporariamente indisponível.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Button className="group">
              <Link href="/">Voltar para página inicial</Link>
            </Button>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
