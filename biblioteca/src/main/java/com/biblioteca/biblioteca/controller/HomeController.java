package com.biblioteca.biblioteca.controller;

import com.biblioteca.biblioteca.service.LivroService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class HomeController {

    @Autowired
    private LivroService livroService;

    @GetMapping("/pagina-livros")
    public String paginaLivros(Model model) {
        model.addAttribute("livros", livroService.getTodosLivros());
        return "livros"; // livros.html
    }
}
