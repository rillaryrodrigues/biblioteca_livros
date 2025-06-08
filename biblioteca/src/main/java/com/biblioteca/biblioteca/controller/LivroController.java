package com.biblioteca.biblioteca.controller;

import com.biblioteca.biblioteca.model.Livro;
import com.biblioteca.biblioteca.service.LivroService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:8000")  // libera CORS para essa origem
@RestController
@RequestMapping("/api/livros") // Evita conflito com a interface web
public class LivroController {

    @Autowired
    private LivroService livroService;

    @GetMapping
    public List<Livro> getLivros() {
        return livroService.getTodosLivros();
    }

    @GetMapping("/{id}")
    public Optional<Livro> getLivro(@PathVariable Integer id) {
        return livroService.getLivroPorId(id);
    }

    @PostMapping
    public Livro addLivro(@RequestBody Livro livro) {
        return livroService.salvarLivro(livro);
    }

    @DeleteMapping("/{id}")
    public void deleteLivro(@PathVariable Integer id) {
        livroService.deletarLivro(id);
    }
}
