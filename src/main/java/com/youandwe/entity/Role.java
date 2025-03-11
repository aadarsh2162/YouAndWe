package com.youandwe.entity;

import jakarta.persistence.Entity;

import java.util.HashSet;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;


@Entity
@Getter
@Setter
public class Role {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false, unique = true)
    private String name;
    

    @ManyToMany(mappedBy = "roles")
    @JsonIgnore
    private Set<AppUsers> users = new HashSet<>();
}
